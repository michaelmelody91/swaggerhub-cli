#!/bin/sh
output=$(/cli/bin/run $*); status=$?;
echo "output is to be set to $output"
echo "\nnew line to verify output variable\n"
echo "::set-output name=response::$output"
exit $status