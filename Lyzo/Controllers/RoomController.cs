using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lyzo.Common.Core.Extensions.Async;
using Lyzo.Common.SignalR.Service.Interface;
using Lyzo.Common.Web.DataTypes.Responses;
using Lyzo.Controllers.Base;
using Lyzo.Models.UiModels;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	public record GetConnectedClientsRequest(Guid RoomId);

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
		public async Task<JsonDataResponse<List<RoomUiModel>>> GetRooms()
		{
			var rooms = await _roomManagementService.GetRooms();

			var roomUiModels = rooms.Select(x => new RoomUiModel()
			{
				Participants = x.Participants,
				Id = x.Id,
				Description = x.Description,
				Name = x.Name,
				CreationDate = x.CreationDate,
				MaxParticipants = x.MaxParticipants
			}).ToList();

			await roomUiModels.ParallelAsync(async x =>
			{
				x.ParticipantCount = (await _roomParticipantService.GetConnectedClients(x.Id)).Count;
			});

			return JsonDataResponse<List<RoomUiModel>>.Success(roomUiModels);
		}

		[HttpPost]
		[Route("GetConnectedClients")]
		public async Task<JsonDataResponse<List<RoomParticipant>>> GetConnectedClients([FromBody] GetConnectedClientsRequest request)
		{
			var participants = await _roomParticipantService.GetConnectedClients(request.RoomId);

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