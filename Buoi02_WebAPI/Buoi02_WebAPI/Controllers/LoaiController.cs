using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;
        private readonly IMapper _mapper;

        public LoaiController(NhatNgheWebAPIContext db, IMapper mapper)
        {
            _context = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<LoaiVM>> GetAll()
        {
            var data = _mapper.Map<List<LoaiVM>>(await _context.Loai.ToListAsync());
            foreach (var loaiVm in data)
            {
                loaiVm.Hinh = MyTools.GetRealUrl("Loai", loaiVm.Hinh, HttpContext.Request);
            }
            return data;
        }

        [HttpGet("{id}")]
        // host/api/Loai/1
        public async Task<IActionResult> GeyById(int id)
        {
            var loai = await _context.Loai.SingleOrDefaultAsync(lo => lo.MaLoai == id);
            if (loai == null)
            {
                return NotFound();
            }
            else
            {
                var loaiVm = _mapper.Map<LoaiVM>(loai);
                loaiVm.Hinh = MyTools.GetRealUrl("Loai", loai.Hinh, HttpContext.Request);
                return Ok(loaiVm);
            }
        }

        [HttpGet("search/{keyword}")]
        public async Task<IActionResult> Search(string keyword)
        {
            try
            {
                var data = _mapper.Map<List<LoaiVM>>(await _context.Loai.Where(lo => lo.TenLoai.Contains(keyword)).ToListAsync());
                foreach (var loaiVm in data)
                {
                    loaiVm.Hinh = MyTools.GetRealUrl("Loai", loaiVm.Hinh, HttpContext.Request);
                }
                return Ok(data);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateLoai(LoaiVM loaiVm)
        {
            try
            {
                var loai = _mapper.Map<Loai>(loaiVm);
                await _context.AddAsync(loai);
                await _context.SaveChangesAsync();
                loaiVm.MaLoai = loai.MaLoai;
                return this.Created($"/{loai.MaLoai}", loaiVm);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLoai(int id, LoaiVM loai)
        {
            if (id != loai.MaLoai)
            {
                return BadRequest();
            }
            var loaiDb = await _context.Loai.SingleOrDefaultAsync(lo => lo.MaLoai == id);
            if (loaiDb == null)
            {
                return NotFound();
            }
            loaiDb.TenLoai = loai.TenLoai;
            loaiDb.MoTa = loai.MoTa;
            loaiDb.Hinh = loai.Hinh;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveLoai(int id)
        {
            var loaiDb = await _context.Loai.SingleOrDefaultAsync(lo => lo.MaLoai == id);
            if (loaiDb == null)
            {
                return NotFound();
            }
            try
            {
                _context.Remove(loaiDb);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return Ok(new ApiResponseModel
                {
                    Success = false,
                    Message = ex.InnerException.Message
                });
            }
        }

    }
}