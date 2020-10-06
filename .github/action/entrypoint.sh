#!/bin/sh
output=$(/usr/src/cli/bin/run $*); status=$?;
echo "$output"
echo "status = $status"
echo "::set-output name=output::$output"
exit $status