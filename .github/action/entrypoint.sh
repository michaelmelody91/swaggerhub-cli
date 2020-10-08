#!/bin/sh
output=$(/cli/bin/run $*); status=$?;
echo "::set-output name=output::$output"
exit $status