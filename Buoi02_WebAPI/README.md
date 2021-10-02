# webapi-react-18032021
Source code Web API + ReactJS khóa 18.03.2021

## 1/ Cấu hình chuỗi kết nối CSDL

### 1.1 Vào tập tin appsettings.json, thêm chuỗi kết nối CSDL

```json
"ConnectionStrings":{
    "NNWebAPI":"Server=.; Database=NhatNgheWebAPI; Integrated Security=true"
}
```

### 1.2/ Vào StartUp.cs khai báo service

```cs
services.AddDbContext<NhatNgheWebAPIContext>(option => {
    option.UseSqlServer(Configuration.GetConnectionString("NNWebApi"));
});
```

## 2/ Cấu hình swagger

Mở StartUp.cs

### 2.1 Thêm vào hàm ConfigureServices(): Đăng ký

```cs
services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "NhatNghe WebAPI",
        Version = "v1",
        Description = "Sample API for NhatNgheWebAPI",
    });
});
```

### 2.2 Thêm vào hàm Configure(): Sử dụng

```cs
app.UseSwagger();
// specifying the Swagger JSON endpoint.
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Ban hang V1");
});
```

## 3/ Cấu hình CORS cho phép các server khác kết nối tới API

### 3.1 Thêm vào hàm ConfigureServices(): Đăng ký

```cs
services.AddCors(option =>
{
    option.AddPolicy(name: "MyAPI", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
```

### 3.2 Thêm vào hàm Configure(): Sử dụng

```cs
app.UseCors("MyAPI");
```

## 4. Authentication
Cài
Microsoft.AspNetCore.Authentication.JwtBearer
chú ý version (3.x/5.x)


### Phát sinh lại Database
Scaffold-DbContext "Server=.; Database=NhatNgheWebAPI; Integrated Security=true" Microsoft.EntityFrameworkCore.Sqlserver -o Models -f