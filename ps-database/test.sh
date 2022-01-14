#!/bin/bash

helpFunction()
{
   echo ""
   echo "Usage: $0 -u user -p password -e email"
   echo -e "\t-u: De gebruikersnaam"
   echo -e "\t-p: Het wachtwoord"
   echo -e "\t-e: Het emailadres van de gebruiker"
   exit 1 # Exit script after printing help
}

while getopts "u:p:e:" opt
do
   case "$opt" in
      u ) user="$OPTARG" ;;
      p ) password="$OPTARG" ;;
      e ) email="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$user" ] || [ -z "$password" ] || [ -z "$email" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

# Begin script in case all parameters are correct
echo "$user"
echo "$password"
echo "$email"