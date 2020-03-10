FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /work
COPY ["Notes.Api.csproj", "Notes.Api.csproj"]
RUN dotnet restore "Notes.Api.csproj"
COPY . .
WORKDIR "/work"
RUN dotnet build "Notes.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Notes.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Notes.Api.dll"]
