using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class HangHoaController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;
        private readonly IMapper _mapper;
        private readonly int SO_PHAN_TU_MOI_TRANG;

        public HangHoaController(NhatNgheWebAPIContext ctx, IConfiguration config, IMapper mapper)
        {
            _context = ctx;
            _mapper = mapper;
            SO_PHAN_TU_MOI_TRANG = int.Parse(config["PagingConfig:NumberOfRecord"]);
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] HangHoaRequestModel model)
        {
            if (!model.Size.HasValue)
            {
                model.Size = SO_PHAN_TU_MOI_TRANG;
            }
            var hangHoa = _context.HangHoa.AsQueryable();

            if (!string.IsNullOrEmpty(model.Search))
            {
                hangHoa = hangHoa.Where(hh => hh.TenHh.Contains(model.Search));
            }

            var data = hangHoa.Skip((model.Page - 1) * model.Size.Value)
                .Take(model.Size.Value)
                .Select(hh => new HangHoaVM
                {
                    MaHh = hh.MaHh,
                    TenHh = hh.TenHh,
                    GiaBan = hh.DonGia,
                    Hinh = MyTools.GetRealUrl("HangHoa", hh.Hinh, HttpContext.Request)
                }).ToList();

            int totalPage = Convert.ToInt32(Math.Ceiling(hangHoa.Count() * 1.0 / model.Size.Value));

            return Ok(new { 
                TotalPage = totalPage,
                PageSize = model.Size.Value,
                CurrentPage = model.Page,
                Data = data
            });
        }

        [HttpGet("{id}")]
        // host/api/HangHoa/11
        //[Authorize(Roles = "VT003")]
        [Authorize]
        public async Task<IActionResult> GetHangHoa(int id)
        {
            if(!User.IsInRole("VT001") || !User.IsInRole("VT003"))
            {
                return this.Forbid();
            }

            var hangHoa = await _context.HangHoa
                .SingleOrDefaultAsync(hh => hh.MaHh == id);
            if (hangHoa == null)
            {
                return NotFound();
            }
            return Ok(new HangHoaVM
            {
                MaHh = hangHoa.MaHh,
                TenHh = hangHoa.TenHh,
                GiaBan = hangHoa.DonGia,
                Hinh = MyTools.GetImageBase64("HangHoa", hangHoa.Hinh)
            });
        }

        [HttpPost("upload")]
        public IActionResult UploadFile(IFormFile myFile)
        {
            if (myFile == null)
            {
                return BadRequest();
            }
            //chỉ định đường dẫn file lưu
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Hinh", myFile.FileName);

            try
            {
                using (var file = new FileStream(fullPath, FileMode.Create))
                {
                    myFile.CopyTo(file);
                }
                //return Ok();
                return StatusCode(StatusCodes.Status200OK);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPost]        
        public IActionResult CreateHangHoa([FromForm] HangHoaRequest model, IFormFile myFile)
        {
            //Check quyền

            var hangHoa = new HangHoa
            {
                TenHh = model.TenHh,
                DonGia = model.DonGia,
                MaLoai = model.MaLoai,
                MaNcc = model.MaNcc,
                NgaySx = model.NgaySX
            };

            if (myFile == null)
            {
                return BadRequest();
            }
            //chỉ định đường dẫn file lưu
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Hinh", "HangHoa", myFile.FileName);

            try
            {
                using (var file = new FileStream(fullPath, FileMode.Create))
                {
                    myFile.CopyTo(file);
                }
                hangHoa.Hinh = myFile.FileName;
                _context.Add(hangHoa);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, hangHoa);
                //return Ok(hangHoa);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}