﻿using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Lyzo.Common.Core.Utils.Async
{
	public class AsyncLazy<T> : Lazy<Task<T>>
	{
		public AsyncLazy(Func<Task<T>> lazyInitializer)
			: base(lazyInitializer)
		{
		}

		public TaskAwaiter<T> GetAwaiter()
		{
			return this.Value.GetAwaiter();
		}
	}
}