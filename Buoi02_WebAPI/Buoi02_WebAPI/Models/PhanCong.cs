using System;
using System.Collections.Generic;

namespace Buoi02_WebAPI.Models
{
    public partial class PhanCong
    {
        public string MaKh { get; set; }
        public string MaVt { get; set; }

        public virtual KhachHang MaKhNavigation { get; set; }
        public virtual VaiTro MaVtNavigation { get; set; }
    }
}
