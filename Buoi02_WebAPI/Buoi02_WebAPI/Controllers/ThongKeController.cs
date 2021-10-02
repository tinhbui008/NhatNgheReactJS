using Buoi02_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;

        public ThongKeController(NhatNgheWebAPIContext ctx)
        {
            _context = ctx;
        }

        [HttpGet("loai")]
        public IActionResult ThongKeTheoLoai(DateTime? TuNgay, DateTime? DenNgay)
        {
            var queryData = _context.ChiTietHd.AsQueryable();
            if (TuNgay.HasValue)
            {
                queryData = queryData.Where(ct => ct.MaHdNavigation.NgayDat >= TuNgay);
            }
            if (DenNgay.HasValue)
            {
                queryData = queryData.Where(ct => ct.MaHdNavigation.NgayDat <= DenNgay);
            }
            var data = queryData.GroupBy(cthd => new
            {
                cthd.MaHhNavigation.MaLoai,
                cthd.MaHhNavigation.MaLoaiNavigation.TenLoai
            })
                .Select(g => new
                {
                    g.Key.MaLoai,
                    g.Key.TenLoai,
                    DoanhThu = g.Sum(cthd => cthd.SoLuong * cthd.DonGia * (1 - cthd.GiamGia)),
                    GiaTrungBinh = g.Average(cthd => cthd.DonGia)
                });
            return Ok(data);
        }

        [HttpGet("khachhang")]
        public IActionResult ThongKeTheoKhachHang(string MaKH)
        {
            var queryData = _context.ChiTietHd.AsQueryable();
            if (!string.IsNullOrEmpty(MaKH))
            {
                queryData = queryData.Where(ct => ct.MaHdNavigation.MaKh == MaKH);
            }

            var data = queryData.GroupBy(cthd => new
            {
                cthd.MaHdNavigation.MaKh,
                cthd.MaHdNavigation.MaKhNavigation.HoTen,
                Nam = cthd.MaHdNavigation.NgayDat.Year,
                Thang = cthd.MaHdNavigation.NgayDat.Month
            })
                .OrderBy(g => g.Key.Nam)
                .ThenBy(g => g.Key.Thang)
                .ThenBy(g => g.Key.HoTen)
                .Select(g => new
                {
                    g.Key.MaKh,
                    g.Key.HoTen,
                    ThoiDiem = $"{g.Key.Thang}/{g.Key.Nam}",
                    DoanhThu = g.Sum(cthd => cthd.SoLuong * cthd.DonGia * (1 - cthd.GiamGia)),
                    
                });
            return Ok(data);
        }

    }
}