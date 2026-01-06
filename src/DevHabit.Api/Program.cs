using DevHabit.Api;
using DevHabit.Api.Database;
using DevHabit.Api.Extensions;
using HealthChecks.UI.Client;

var builder = WebApplication.CreateBuilder(args);

builder.AddApiServices();
builder.AddErrorHandling();
builder.AddDatabase();
builder.AddObservability();
builder.AddApplicationServices();
builder.AddAuthenticationServices();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.ApplyMigrations<ApplicationDbContext>();
    app.ApplyMigrations<ApplicationIdentityDbContext>();

    await app.SeedInitialDataAsync();
}

// app.UseHttpsRedirection();

app.UseCors("AllowAngularDev");

app.UseExceptionHandler();

app.UseAuthentication();

app.UseAuthorization();

app.MapHealthChecks("health", new()
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

app.MapControllers();

app.Run();