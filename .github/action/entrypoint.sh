#!/bin/sh
output=$(./bin/run $*)
echo "::set-output name=output::$output"
exit $?