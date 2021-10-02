using System;
using System.Collections.Generic;

namespace Buoi02_WebAPI.Models
{
    public partial class VaiTro
    {
        public VaiTro()
        {
            NguoiDung = new HashSet<NguoiDung>();
            PhanCong = new HashSet<PhanCong>();
        }

        public string MaVt { get; set; }
        public string TenVaiTro { get; set; }
        public string ThongTin { get; set; }

        public virtual ICollection<NguoiDung> NguoiDung { get; set; }
        public virtual ICollection<PhanCong> PhanCong { get; set; }
    }
}
