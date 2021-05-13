using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Common.Web.DataTypes.Responses;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	public record GetConnectedClientsRequest(string RoomId);

	[Route("[controller]")]
	public class RoomController : ControllerBase
	{
		private readonly IRoomManagementService _roomManagementService;

		private readonly IRoomParticipantService _roomParticipantService;

		public RoomController(
			IRoomManagementService roomManagementService,
			IRoomParticipantService roomParticipantService)
		{
			_roomManagementService = roomManagementService;
			_roomParticipantService = roomParticipantService;
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

			return JsonDataResponse<List<RoomParticipant>>.Success(participants);
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