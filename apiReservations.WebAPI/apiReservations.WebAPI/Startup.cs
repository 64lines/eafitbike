using apiReservations.WebAPI.Configuration;
using apiReservations.WebAPI.Infrastructure.Context;
using apiReservations.WebAPI.PipelineBehaviours;
using apiReservations.WebAPI.Tools;
using FluentValidation;
using MassTransit;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;

namespace apiReservations.WebAPI
{
    public class Startup
    {
        readonly string MiCors = "MiCors";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<MessageBrokerConfiguration>(Configuration.GetSection("MessagaBrokerConfiguration"));
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));
            #region Swagger
            //Documentación
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "apiReservation Documentación",
                    Version = "v1",
                    Description = "API REST para el microservicio que maneja las reservas ",
                    Contact = new OpenApiContact()
                    {
                        Name = "Santiago Alvarez M",
                        Email = "salvarezm1@eafit.edu.co"
                    }

                });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            #endregion
            services.AddScoped<IApplicationContext>(provider => provider.GetService<ApplicationContext>());

            services.AddCors(options =>
            {
                options.AddPolicy(name: MiCors,
                                    builder =>
                                    {
                                        builder.WithHeaders("*");
                                        builder.WithOrigins("*");
                                        builder.WithMethods("*");
                                    });
            });

            services.AddMassTransit(x =>
            {
                x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
                {
                    //config.UseHealthCheck(provider);
                    config.Host(new Uri(Configuration["MessagaBrokerConfiguration:UriHost"]), h =>
                    {
                        h.Username(Configuration["MessagaBrokerConfiguration:Username"]);
                        h.Password(Configuration["MessagaBrokerConfiguration:Password"]);
                    });
                }));
            });
            services.AddMassTransitHostedService();

            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new IntToStringConverter());
                    options.JsonSerializerOptions.Converters.Add(new DecimalToStringConverter());
                })
                ; 

            services.AddValidatorsFromAssembly(typeof(Startup).Assembly);

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MiCors);

            app.UseAuthorization();
            #region Swagger
             //DOCUMENTACIÓN
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "apiReservatios v1");
            });
            #endregion
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
