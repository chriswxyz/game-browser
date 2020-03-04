#!/bin/sh

echo "starting up!";
export $(egrep -v '^#' .env | xargs);
dotnet run --project ./src/GameBrowser.API/GameBrowser.WebAPI/GameBrowser.WebAPI.csproj;