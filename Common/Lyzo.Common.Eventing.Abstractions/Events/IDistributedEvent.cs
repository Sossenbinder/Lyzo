using System;
using System.Threading.Tasks;
using Lyzo.Common.Core.Disposable;
using MassTransit;

namespace Lyzo.Common.Eventing.Abstractions.Events
{
	public interface IDistributedEvent : IEvent
	{
		Task Raise();

		void RaiseFireAndForget();

		DisposableAction RegisterForErrors(Func<Fault, Task> faultHandler);
	}

	public interface IDistributedEvent<TEventArgs> : IEvent<TEventArgs>
		where TEventArgs : class
	{
		Task Raise(TEventArgs eventArgs);

		void RaiseFireAndForget(TEventArgs eventArgs);

		DisposableAction RegisterForErrors(Func<Fault<TEventArgs>, Task> faultHandler);
	}
}