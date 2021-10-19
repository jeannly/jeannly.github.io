#!/bin/bash

grep -Po '<div class="page-body">\K.*' "$1" > article.html





