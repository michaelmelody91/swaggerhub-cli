#!/bin/sh
ls
output=$(./bin/run $*)
echo "::set-output name=output::$output"
exit $?