using System;
using Autofac;
using Lyzo.Common.DI.DataTypes;
using MassTransit;

namespace Lyzo.Common.Eventing.Extensions
{
	public static class ContainerBuilderExtensions
	{
		public static void RegisterMtConsumer<TConsumer>(this ContainerBuilder builder)
			where TConsumer : IConsumer
		{
			builder.Register(_ => DataContainer<Type>.Create(typeof(TConsumer)))
				.As<DataContainer<Type>>()
				.SingleInstance();

			builder.RegisterType<TConsumer>()
				.AsSelf()
				.InstancePerDependency();
		}
	}
}