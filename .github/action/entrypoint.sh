#!/bin/sh
output=$(/usr/src/cli/bin/run $*)
output=$(true); status=$?;
echo "::set-output name=output::$output"
exit $status