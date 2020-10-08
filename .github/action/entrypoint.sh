#!/bin/sh
output=$(/cli/bin/run $*); status=$?;
echo "output is to be set to $output"
echo "::set-output name=response::$output"
exit $status