#!/bin/sh
output=$(/usr/src/cli/bin/run $*); status=$?;
echo "::set-output name=output::$output"
exit $status