using System;
using Autofac;
using MassTransit;

namespace Lyzo.Common.Eventing.MassTransit.Service
{
	public class MassTransitEventingService : IStartable, IDisposable
	{
		private readonly IBusControl _busControl;

		public MassTransitEventingService(IBusControl busControl)
		{
			_busControl = busControl;
		}

		public void Start()
		{
			_busControl.Start();
		}

		public void Dispose()
		{
			_busControl.Stop();
		}
	}
}