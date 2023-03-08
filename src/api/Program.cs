var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
const string AllowedSpecificOriginsPolicyName = "AllowedSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedSpecificOriginsPolicyName,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                      });
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors(AllowedSpecificOriginsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
