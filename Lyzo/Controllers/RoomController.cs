using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyzo.Common.SignalR.Service.Interface;
using Lyzo.Common.Web.DataTypes.Responses;
using Lyzo.Controllers.Base;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	public record GetConnectedClientsRequest(string RoomId);

	[Route("[controller]")]
	public class RoomController : IdentityControllerBase
	{
		private readonly IRoomManagementService _roomManagementService;

		private readonly IRoomParticipantService _roomParticipantService;

		private readonly IConnectionMappingService _connectionMappingService;

		public RoomController(
			IRoomManagementService roomManagementService,
			IRoomParticipantService roomParticipantService,
			IConnectionMappingService connectionMappingService)
		{
			_roomManagementService = roomManagementService;
			_roomParticipantService = roomParticipantService;
			_connectionMappingService = connectionMappingService;
		}

		[HttpGet]
		[Route("GetRooms")]
		public async Task<JsonDataResponse<List<Room>>> GetRooms()
		{
			var rooms = await _roomManagementService.GetRooms();

			return JsonDataResponse<List<Room>>.Success(rooms);
		}

		[HttpPost]
		[Route("GetConnectedClients")]
		public JsonDataResponse<List<RoomParticipant>> GetConnectedClients([FromBody] GetConnectedClientsRequest request)
		{
			var participants = _roomParticipantService.GetConnectedClients(request.RoomId);

			var ownId = _connectionMappingService.GetIdForClient(UserId.ToString())!;

			return JsonDataResponse<List<RoomParticipant>>.Success(participants.Where(x => x.ConnectionId != ownId).ToList());
		}

		[HttpPost]
		[Route("CreateRoom")]
		public async Task<JsonDataResponse<Guid>> CreateRoom([FromBody] Room roomDetails)
		{
			var roomId = await _roomManagementService.CreateRoom(roomDetails);

			return JsonDataResponse<Guid>.Success(roomId);
		}
	}
}