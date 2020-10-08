#!/bin/sh
output=$(/cli/bin/run $*); status=$?;
echo "In GH action entrypoint"
echo "::set-output name=output::$output"
exit $status