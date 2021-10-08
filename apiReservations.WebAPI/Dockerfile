#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["apiReservations.WebAPI/apiReservations.WebAPI.csproj", "apiReservations.WebAPI/"]
RUN dotnet restore "apiReservations.WebAPI/apiReservations.WebAPI.csproj"
COPY . .
WORKDIR "/src/apiReservations.WebAPI"
RUN dotnet build "apiReservations.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "apiReservations.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "apiReservations.WebAPI.dll"]