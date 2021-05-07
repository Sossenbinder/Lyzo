using System;
using System.Collections.Generic;

namespace Lyzo.Common.Core.Extensions
{
	public static class DictionaryExtensions
	{
		public static void AddOrUpdate<TKey, TValue>(
			this Dictionary<TKey, TValue> dictionary,
			TKey key,
			TValue valueForAdd,
			Action<TValue> updateValueTransformer)
			where TKey : notnull
		{
			var addSuccess = dictionary.TryAdd(key, valueForAdd);

			if (addSuccess)
			{
				return;
			}

			var value = dictionary[key];

			updateValueTransformer(value);
		}
	}
}