using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using QuizAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Conects the app to the database.
builder.Services.AddDbContext<QuizDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

//Allows cross origin request. Set it so allows the react application to access the api with any method (i.e POST, GET) and header (i.e JSON)
app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader());

//To access the images stored in the folder.
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Images")),
    RequestPath = "/Images"
});





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

/*using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var dbContext = services.GetRequiredService<QuizDbContext>();

    *//*SeedData(dbContext);
}*/

app.Run();

/*static void SeedData(QuizDbContext context)
{
    if (!context.Admins.Any())
    {
        string admin1Password = "password1";
        string passwordHash1 = BCrypt.Net.BCrypt.EnhancedHashPassword(admin1Password, 13);

        string admin2Password = "password2";
        string passwordHash2 = BCrypt.Net.BCrypt.EnhancedHashPassword(admin2Password, 13);

        context.Admins.AddRange(
            new Admin {Name = "admin1", Email = "admin1@q.com", Password = passwordHash1 },
            new Admin {Name = "admin2", Email = "admin2@q.com", Password = passwordHash2 }
        );
        context.SaveChanges();
    }
}*/


