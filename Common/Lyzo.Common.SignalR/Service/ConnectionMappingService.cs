using System.Collections.Concurrent;
using Lyzo.Common.SignalR.Service.Interface;

namespace Lyzo.Common.SignalR.Service
{
	public class ConnectionMappingService : IConnectionMappingService
	{
		private readonly ConcurrentDictionary<string, string> _mappings;

		public ConnectionMappingService()
		{
			_mappings = new();
		}

		public void PutIdForClient(string clientIdent, string connectionId)
		{
			_mappings.AddOrUpdate(
				clientIdent,
				_ => connectionId,
				(_, _) => connectionId);
		}

		public string? GetIdForClient(string clientIdent)
		{
			return _mappings.TryGetValue(clientIdent, out var connectionId) ? connectionId : null;
		}

		public void DisconnectClient(string clientIdent)
		{
			_mappings.TryRemove(clientIdent, out _);
		}
	}
}