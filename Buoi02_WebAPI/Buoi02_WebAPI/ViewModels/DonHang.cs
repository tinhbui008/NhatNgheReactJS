using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buoi02_WebAPI.ViewModels
{
    public class DonHang
    {
        public string MaKh { get; set; }
        public string NguoiNhan { get; set; }
        public string DiaChiGiao { get; set; }
        public List<DonHangChiTiet> HangHoa { get; set; }
        public DonHang()
        {
            HangHoa = new List<DonHangChiTiet>();
        }
    }

    public class DonHangChiTiet
    {
        public int MaHH { get; set; }
        public int SoLuong { get; set; }
    }

    public class DonHangResponse
    {
        public int MaHd { get; set; }
        public DateTime NgayDat{ get; set; }
        public string NguoiMua { get; set; }
        public string NguoiNhan { get; set; }
        public string DiaChiGiao { get; set; }
        public int TrangThai { get; set; }
        public List<ChiTietDonHang> HangHoa { get; set; }
        public DonHangResponse()
        {
            HangHoa = new List<ChiTietDonHang>();
        }
    }
    public class ChiTietDonHang
    {
        public int MaHh { get; set; }
        public string TenHh { get; set; }
        public double DonGia { get; set; }
        public int SoLuong { get; set; }
    }
}
