#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Lyzo/Lyzo.csproj", "Lyzo/"]
COPY ["Module/Lyzo.Module.Voice/Lyzo.Module.Voice.csproj", "Module/Lyzo.Module.Voice/"]
COPY ["Common/Lyzo.Common.Logging/Lyzo.Common.Logging.csproj", "Common/Lyzo.Common.Logging/"]
COPY ["Common/Lyzo.Common.Eventing/Lyzo.Common.Eventing.csproj", "Common/Lyzo.Common.Eventing/"]
COPY ["Common/Lyzo.Common.Core/Lyzo.Common.Core.csproj", "Common/Lyzo.Common.Core/"]
COPY ["Common/Lyzo.Common.DI/Lyzo.Common.DI.csproj", "Common/Lyzo.Common.DI/"]
COPY ["Common/Lyzo.Common.SignalR/Lyzo.Common.SignalR.csproj", "Common/Lyzo.Common.SignalR/"]
COPY ["Module/Lyzo.Module.Notifications/Lyzo.Module.Notifications.csproj", "Module/Lyzo.Module.Notifications/"]
RUN dotnet restore "Lyzo/Lyzo.csproj"
COPY . .
WORKDIR "/src/Lyzo"
RUN dotnet build "Lyzo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lyzo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lyzo.dll"]
