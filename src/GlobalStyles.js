import React from 'react'
import { css, Global, withTheme } from '@emotion/react'

// https://stackoverflow.com/questions/51637950/enable-global-theming-with-emotion

const makeGlobalStyles = (theme) => css`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: sans-serif;
    height: 100%;
  }

  body {
    height: 100%;
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul,
  legend {
    margin: 0;
    padding: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
  }

  fieldset {
    padding: 0;
    border: 0;
    margin: 0;
  }

  label {
    position: relative;
  }

  input,
  textarea,
  select {
    -webkit-appearance: none;
  }

  input[type='search'] {
    -webkit-appearance: none;

    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='submit'] {
    width: auto;
    cursor: pointer;
  }

  ol,
  ul {
    list-style: none;
  }

  ol {
    list-style: decimal outside;
    padding: 0 0 0 1.5rem;

    li {
      margin: 1em 0 0;

      span {
        position: relative;
        left: 0rem;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    tr {
      border-bottom-width: 0.1rem;
      border-bottom-style: solid;
      border-bottom-color: ${theme.border.color};
    }

    th,
    td {
      text-align: center;
      padding: 1rem 0;

      &:first-of-type {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }

    thead th {
      font-weight: normal;
      color: ${theme.colors.primary};
    }

    tbody tr:last-child {
      border-bottom: 0;
    }
  }

  a,
  button {
    &:active {
      outline: none;
    }
  }

  button {
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none;
    padding: 0;
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    transition: ${theme.links.transition};
    font-size: ${theme.fonts.sizes.main};
    color: ${theme.fonts.body.color};
  }

  button:disabled {
    cursor: default;
    opacity: 0.5;
  }

  button > * {
    pointer-events: none;
  }

  body {
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    text-transform: ${theme.fonts.body.textTransform};
    -webkit-font-smoothing: ${theme.fonts.body.fontSmoothing};
    color: ${theme.fonts.body.color};
    font-size: ${theme.fonts.sizes.main};
    background-color: ${theme.bgColors.primary};
  }

  header {
    background-color: ${theme.header.primary};
    &.stuck {
      background-color: ${theme.header.stuck};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fonts.headings.family};
    font-weight: ${theme.fonts.headings.weight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    text-transform: ${theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headings.fontSmoothing};
    color: ${theme.fonts.headings.color};
  }

  h1 {
    font-size: ${theme.fonts.sizes.h1};
  }

  h2 {
    font-size: ${theme.fonts.sizes.h2};
  }

  h3 {
    font-size: ${theme.fonts.sizes.h3};
  }

  h4 {
    font-size: ${theme.fonts.sizes.h4};
  }

  h5 {
    font-size: ${theme.fonts.sizes.h5};
  }

  h6 {
    font-size: ${theme.fonts.sizes.h6};
  }

  a {
    cursor: pointer;
    text-decoration: ${theme.links.textDecoration};
    transition: ${theme.links.transition};
    color: ${theme.links.primary.color};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.links.primary.hover};
    }
  }

  input,
  textarea,
  select {
    width: 100%;
    line-height: ${theme.inputs.lineHeight};
    padding: ${theme.inputs.padding};
    border: 0;
    border-bottom: ${theme.inputs.borderWidth} solid ${theme.inputs.borderColor};
    border-radius: ${theme.inputs.radius};
    color: ${theme.inputs.color};
    // background-color: ${theme.inputs.bgColor};
    background-color: transparent;
    box-shadow: ${theme.inputs.boxShadow};
    font-family: ${theme.fonts.body.family};
    font-size: ${theme.fonts.sizes.main};
    transition: ${theme.links.transition};

    &::placeholder {
      color: ${theme.inputs.color};
      opacity: 0.5;
    }

    &::selection {
      color: ${theme.bgColors.primary};
      background-color: ${theme.fonts.body.color};
    }

    &:active,
    &:focus {
      color: ${theme.inputs.color};
      background-color: ${theme.inputs.bgColor};
      border: ${theme.inputs.borderWidth} solid ${theme.inputs.borderColor};
    }

    &:disabled,
    &:read-only {
      cursor: default;
      opacity: 0.5;
      color: ${theme.inputs.color};
      background-color: ${theme.inputs.bgColor};
      border: ${theme.inputs.borderWidth} solid ${theme.inputs.borderColor};
    }
  }

  input,
  textarea {
    box-shadow: ${theme.inputs.boxShadow};

    &:active,
    &:focus {
      box-shadow: ${theme.inputs.boxShadow};
    }
  }

  textarea {
    height: 5em;
  }

  select {
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  select:read-only {
    opacity: 1;
    cursor: pointer;
    border: ${theme.inputs.borderWidth} solid ${theme.inputs.borderColor};
    background-color: ${theme.bgColors.primary};
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fill-bar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .md-enter,
  .md-exit.md-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;

    > div {
      transition: all 250ms ease;
      transform: translateY(10%);
    }
  }

  .md-enter.md-enter-active,
  .md-exit {
    opacity: 1;
    visibility: visible;

    > div {
      transform: translateY(0);
    }
  }

  .sidebar-enter,
  .sidebar-exit.sidebar-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    visibility: hidden;
    transform: translateX(100%);
  }

  .sidebar-enter.sidebar-enter-active,
  .sidebar-exit {
    visibility: visible;
    transform: translateX(0);
  }

  .sidebar-left-enter,
  .sidebar-left-exit.sidebar-left-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    transform: translateX(-100%);
  }

  .sidebar-left-enter.sidebar-left-enter-active,
  .sidebar-left-exit {
    transform: translateX(0);
  }

  .slide-up-enter,
  .slide-up-exit.slide-up-exit-active {
    transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    opacity: 0;
    visibility: hidden;
    transform: translate3D(0, 100%, 0);
  }

  .slide-up-enter.slide-up-enter-active,
  .slide-up-exit {
    opacity: 1;
    visibility: visible;
    transform: translate3D(0, 0, 0);
  }

  .overlay-enter,
  .overlay-exit.overlay-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
  }

  .overlay-enter.overlay-enter-active,
  .overlay-exit {
    opacity: 1;
    visibility: visible;
  }

  .flash-enter {
    opacity: 0;
    transform: translateY(20%);
  }

  .flash-enter-active,
  .flash-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-exit-active {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter-active,
  .flash-message-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-message-exit-active {
    opacity: 0;
    transform: translateY(20%);
  }

  .reveal-enter,
  .reveal-exit.reveal-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
  }

  .reveal-enter.reveal-enter-active,
  .reveal-exit {
    opacity: 1;
    visibility: visible;
  }

  .slide-toggle-down-enter,
  .slide-toggle-down-exit.slide-toggle-down-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10%);
  }

  .slide-toggle-down-enter.slide-toggle-down-enter-active,
  .slide-toggle-down-exit {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .react-datepicker__navigation--previous {
    border-right-color: ${theme.links.primary.color};
  }

  .react-datepicker__navigation--next {
    border-left-color: ${theme.links.primary.color};
  }

  .react-datepicker__time-container {
    border-left-color: ${theme.border.color};
  }

  .react-datepicker__day,
  .react-datepicker__time-list-item {
    color: ${theme.links.primary.color};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day:hover,
  .react-datepicker__day:active,
  .react-datepicker__day:focus,
  .react-datepicker__time-list-item--selected,
  .react-datepicker__time-list-item:hover,
  .react-datepicker__time-list-item:active,
  .react-datepicker__time-list-item:focus {
    color: ${theme.colors.light};
    background-color: ${theme.links.primary.color};
  }

  .react-datepicker__day--today {
    background-color: ${theme.bgColors.secondary};
  }

  .react-datepicker__day--disabled,
  .react-datepicker__time-list-item--disabled,
  .react-datepicker__day--disabled:hover,
  .react-datepicker__time-list-item--disabled:hover {
    color: ${theme.fonts.body.color} !important;
    background-color: transparent !important;
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
