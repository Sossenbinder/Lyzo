using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Autofac;
using Lyzo.Common.Eventing.DI;
using Lyzo.Common.Eventing.Extensions;
using Lyzo.Common.Eventing.MassTransit.Helper;
using Lyzo.Common.Logging.Log;
using MassTransit;
using Microsoft.AspNetCore.DataProtection;
using Serilog;
using Lyzo.Common.SignalR;
using Lyzo.Module.Rooms.DI;

namespace Lyzo
{
	public class Startup
	{
		private readonly bool _isDevelopmentEnvironment;

		public Startup(
			IConfiguration configuration,
			IWebHostEnvironment webHostEnvironment)
		{
			Configuration = configuration;
			_isDevelopmentEnvironment = webHostEnvironment.IsDevelopment();
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services
				.AddControllersWithViews()
				.AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

			services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog(LogProvider.CreateLogger(Configuration)));

			services.AddSignalR();

			services.AddMemoryCache();

			if (_isDevelopmentEnvironment)
			{
				services.AddDataProtection()
					.SetApplicationName("Lyzo")
					.PersistKeysToFileSystem(new DirectoryInfo("/keys/storage"));
			}
			else
			{
				//services.AddDataProtection()
				//	.PersistKeysToAzureBlobStorage(Configuration["CloudStorageAccountConnectionString"], "dataprotection", "keys")
				//	.ProtectKeysWithAzureKeyVault(new Uri("https://picro.vault.azure.net/"), new DefaultAzureCredential());
			}
		}

		// ReSharper disable once UnusedMember.Global
		public void ConfigureContainer(ContainerBuilder builder)
		{
			builder.RegisterModule<MassTransitModule>();
			builder.RegisterModule<RoomsModule>();

			builder.Register(context =>
				{
					return context.Resolve<MassTransitBusFactory>().CreateBus(_isDevelopmentEnvironment, cfg =>
					{
						cfg.ReceiveEndpoint(Dns.GetHostName(), ec =>
						{
							ec.RegisterMassTransitConsumers(context);
						});
					});
				}).As<IBus, IBusControl>()
				.SingleInstance();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller=Home}/{action=Index}/{id?}");

				endpoints.MapFallbackToController("Index", "Home");

				endpoints.MapHub<SignalRHub>("/signalRHub");
			});
		}
	}
}