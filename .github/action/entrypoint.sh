#!/bin/sh
output=$(/cli/bin/run $*); status=$?;
echo "In GH action entrypoint"
echo "::set-output name=response::$output"
exit $status