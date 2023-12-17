#!/bin/bash

echo `lsof -n -i :8761 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
echo `lsof -n -i :9191 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
echo `lsof -n -i :8083 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
echo `lsof -n -i :8081 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
echo `lsof -n -i :8082 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
echo `lsof -n -i :9000 | grep LISTEN | grep -o -E 'node    [0-9]*' | grep -o -E '[0-9]*'`;

kill -9 `lsof -n -i :8761 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
kill -9 `lsof -n -i :9191 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
kill -9 `lsof -n -i :8083 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
kill -9 `lsof -n -i :8081 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
kill -9 `lsof -n -i :8082 | grep LISTEN | grep -o -E 'java    [0-9]*' | grep -o -E '[0-9]*'`;
kill -9 `lsof -n -i :9000 | grep LISTEN | grep -o -E 'node    [0-9]*' | grep -o -E '[0-9]*'`;