import { Injectable, Component } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';


export const preventBackButtonGuard: CanDeactivateFn<unknown>=(
component,
currentRoute,
currentState,
nextState
)=>{return false};
