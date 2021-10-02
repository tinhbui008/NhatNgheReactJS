using AutoMapper;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;

namespace Buoi02_WebAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //định nghĩa phần map
            CreateMap<Loai, LoaiVM>().ReverseMap();
            CreateMap<HangHoaVM, HangHoa>().ReverseMap();
            CreateMap<HangHoaRequest, HangHoa>();
        }
    }
}
