using AnimalShelter.Infrastructure.Entities;
using AnimalShelter.Services;
using AnimalShelter.Services.Contract;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
//builder.Services.AddDbContext<AnimalShelterDbContext>(options => options.UseSqlServer(
//   builder.Configuration.GetSection("ConnectionString").Value)
//);
builder.Services.AddDbContext<AnimalShelterDbContext>();

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IAnnouncementService, AnnouncementService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
//if (app.Environment.IsDevelopment())
//{
    app.UseSwaggerUI();
//}

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
