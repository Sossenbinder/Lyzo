using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyzo.Common.Core.Disposable;
using Lyzo.Common.Core.Utils.Collections;
using Lyzo.Common.Eventing.Events.Interface;

namespace Lyzo.Common.Eventing.Events
{
	public abstract class EventBase : IEvent
	{
		protected readonly ConcurrentHashSet<Func<Task>> Handlers = new();

		public virtual DisposableAction Register(Func<Task> handler)
		{
			Handlers.Add(handler);

			return new DisposableAction(() => Unregister(handler));
		}

		public void Unregister(Func<Task> handler)
		{
			Handlers.Remove(handler);
		}

		internal List<Func<Task>> GetAllRegisteredEvents()
		{
			return Handlers.ToArray().ToList();
		}
	}

	public abstract class EventBase<TEventArgs> : IEvent<TEventArgs>
	{
		protected readonly ConcurrentHashSet<Func<TEventArgs, Task>> Handlers = new();

		public virtual DisposableAction Register(Func<TEventArgs, Task> handler)
		{
			Handlers.Add(handler);

			return new DisposableAction(() => Unregister(handler));
		}

		public void Unregister(Func<TEventArgs, Task> handler)
		{
			Handlers.Remove(handler);
		}

		internal List<Func<TEventArgs, Task>> GetAllRegisteredEvents()
		{
			return Handlers.ToArray().ToList();
		}
	}
}