using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;

        public DonHangController(NhatNgheWebAPIContext ctx)
        {
            _context = ctx;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOrder(DonHang donHang)
        {
            //var orderId = Guid.NewGuid();            
            var hoaDon = new HoaDon
            {
                MaKh = donHang.MaKh,
                HoTen = donHang.NguoiNhan,
                DiaChi = donHang.DiaChiGiao,
                NgayDat = DateTime.UtcNow,
                NgayCan = DateTime.UtcNow.AddDays(2),
                NgayGiao = DateTime.UtcNow.AddDays(2),
                CachThanhToan = "Tiền mặt",
                CachVanChuyen = "Đường bộ",
                PhiVanChuyen = 0,
                TrangThai = 0//mới đặt
            };

            var trans = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.AddAsync(hoaDon);
                await _context.SaveChangesAsync();

                // tạo chi tiết hóa đơn
                foreach (var chitiet in donHang.HangHoa)
                {
                    var hangHoa = await _context.HangHoa.SingleOrDefaultAsync(hh => hh.MaHh == chitiet.MaHH);
                    if (hangHoa != null)
                    {
                        await _context.AddAsync(new ChiTietHd { 
                            MaHd = hoaDon.MaHd,
                            MaHh = hangHoa.MaHh,
                            SoLuong = chitiet.SoLuong,
                            DonGia = hangHoa.DonGia.Value,
                            GiamGia = hangHoa.GiamGia
                        });
                    }
                }
                await _context.SaveChangesAsync();

                await trans.CommitAsync();
                return Ok(new ApiResponseModel
                {
                    Success = true,
                    Data = hoaDon.MaHd
                });
            }
            catch
            {
                await trans.RollbackAsync();
                return Ok(new ApiResponseModel { 
                    Success = false,
                    Message = "Tạo mới hóa đơn không thành công"
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            try
            {
                var hoaDon = await _context.HoaDon
                    .Include(hd => hd.MaKhNavigation)
                    .Include(hd => hd.ChiTietHd)
                    .ThenInclude(cthd => cthd.MaHhNavigation)
                    .SingleOrDefaultAsync(hd => hd.MaHd == id);
                if (hoaDon == null)
                {
                    return NotFound();
                }
                var result = new DonHangResponse
                {
                    MaHd = hoaDon.MaHd,
                    NguoiNhan = hoaDon.HoTen,
                    DiaChiGiao = hoaDon.DiaChi,
                    NgayDat = hoaDon.NgayDat,
                    TrangThai = hoaDon.TrangThai,
                    NguoiMua = hoaDon.MaKhNavigation.HoTen
                };
                //thêm data cho hàng hóa
                foreach (var chiTiet in hoaDon.ChiTietHd)
                {
                    result.HangHoa.Add(new ChiTietDonHang
                    {
                        MaHh = chiTiet.MaHh,
                        SoLuong = chiTiet.SoLuong,
                        DonGia = chiTiet.DonGia,
                        TenHh = chiTiet.MaHhNavigation.TenHh
                    });
                }

                return Ok(result);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}