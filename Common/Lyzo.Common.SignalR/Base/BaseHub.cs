using System;
using System.Threading.Tasks;
using Lyzo.Common.SignalR.Service.Interface;
using Lyzo.Module.Rooms.Abstractions.Events;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace Lyzo.Common.SignalR.Base
{
	public class BaseHub : Hub
	{
		protected readonly IConnectionMappingService ConnectionMappingService;

		protected const string IDENT_COOKIE_NAME = "ClientIdent";

		protected string ConnectionId => ConnectionMappingService.GetIdForClient(ClientIdent);

		protected string ClientIdent => GetConnectionId(Context.GetHttpContext());

		protected readonly IRoomEvents RoomEvents;

		public BaseHub(
			IRoomEvents roomEvents,
			IConnectionMappingService connectionMappingService)
		{
			RoomEvents = roomEvents;
			ConnectionMappingService = connectionMappingService;
		}

		public override Task OnConnectedAsync()
		{
			ConnectionMappingService.PutIdForClient(ClientIdent, Context.ConnectionId);
			return Task.CompletedTask;
		}

		public override async Task OnDisconnectedAsync(Exception exception)
		{
			await RoomEvents.ParticipantDisconnected.Raise(new ParticipantDisconnected(ConnectionId));
			ConnectionMappingService.DisconnectClient(ClientIdent);
		}

		private static string? GetConnectionId(HttpContext httpContext)
		{
			if (!httpContext.Request.Cookies.TryGetValue(IDENT_COOKIE_NAME, out var identValue))
			{
				return null;
			}

			if (Guid.TryParse(identValue, out var userId))
			{
				return userId.ToString();
			}

			return null;
		}
	}
}