using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buoi02_WebAPI.ViewModels
{
    public class HangHoaVM
    {
        public int MaHh { get; set; }
        public string TenHh { get; set; }
        public string Hinh { get; set; }
        public double? GiaBan { get; set; }
    }

    public class HangHoaRequest
    {
        public string TenHh { get; set; }
        public string MaNcc { get; set; }
        public int MaLoai { get; set; }
        public double DonGia { get; set; }
        public DateTime NgaySX { get; set; }
    }
}
