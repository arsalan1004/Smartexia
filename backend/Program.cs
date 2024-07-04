using ApiDependencies;
using ApiDependencies.filters.authFiler;
using backend.data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//       policy  =>
//       {
//           policy.WithOrigins("http://localhost:8081", "http://192.168.2.100:8081", "http://192.168.2.1:8081");
//       });
// });

// Setting Environment Variables
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"./smartexia-firebase-adminsdk.json");


// Add services to the container.
builder.Services.AddApiDependencies();

// Supabase-Postgres connection
builder.Services.AddDbContext<smartexiaContext>(option =>
    option.UseNpgsql(Environment.GetEnvironmentVariable("DbConnectionString")));
 
builder.Services.AddControllers();
builder.Services.AddDataProtection();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Creating session to store token
app.UseSession();
app.Use(async (context, next) =>
{
    var token = context.Session.GetString("token");
    if (!string.IsNullOrEmpty(token))
    {
        context.Request.Headers.Append("Authorization", "Bearer " + token);
    }
    await next();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();