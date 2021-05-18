using System;
using System.Threading.Tasks;
using Lyzo.Common.Core.Disposable;

namespace Lyzo.Common.Eventing.Abstractions.Events
{
	public interface IEvent
	{
		DisposableAction Register(Func<Task> handler);

		void Unregister(Func<Task> handler);
	}

	/// <summary>
	/// Exposes methods for basic event registrations
	/// </summary>
	public interface IEvent<out TEventArgs>
	{
		DisposableAction Register(Func<TEventArgs, Task> handler);

		void Unregister(Func<TEventArgs, Task> handler);
	}
}