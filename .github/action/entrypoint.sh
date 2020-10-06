#!/bin/sh
ls
output=$(/usr/src/cli/bin/run $*)
echo "::set-output name=output::$output"
exit $?