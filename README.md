# Trade-Planner
The Indian Intraday Trade Planner is a web-based tool designed to help traders calculate precise position sizing, stop-loss, and target levels for intraday trading in Indian stocks.

Project Description

The Indian Intraday Trade Planner is a web-based tool designed to help traders calculate precise position sizing, stop-loss, and target levels for intraday trading in Indian stocks. By fetching live stock prices from Google Sheets using the GOOGLEFINANCE function and a Google Apps Script API, it automates trade calculations and helps manage capital efficiently.

This project is ideal for beginner to intermediate traders who want a systematic way to plan trades without relying on manual calculations.

Problem Solved

Manual intraday trade calculations can lead to:

Mistakes in quantity calculation

Mismanagement of risk

Delayed decisions

Reduced profitability

This tool addresses these problems by:

Fetching live NSE stock prices automatically

Calculating position size based on capital

Determining stop-loss based on user-defined risk

Calculating target price using the risk-reward ratio

Showing projected capital if stop-loss or target is hit

✅ This reduces human error, saves time, and makes intraday trading more systematic and disciplined.

Features

Enter stock symbol, capital, risk per trade, and risk-reward ratio

Fetch live NSE stock prices using Google Sheets and Apps Script

Automatic calculation of:

Entry price

Quantity

Stop-loss

Target

Capital projection after trade outcome (if stop-loss or target hits)

Mobile-friendly, simple, and clean UI

Fully frontend-compatible with GitHub Pages

Tech Stack

Frontend: HTML, CSS, JavaScript

Backend (Serverless): Google Apps Script

Live Data: Google Sheets GOOGLEFINANCE function

Hosting: GitHub Pages

How It Works

The user enters the stock symbol, capital, risk, and risk-reward ratio in the web interface.

The frontend calls a Google Apps Script API.

The API updates a Google Sheet cell with the stock symbol.

GOOGLEFINANCE fetches the live stock price from NSE.

The API returns the price to the frontend as JSON.

Frontend calculates:

Quantity = Capital ÷ Entry Price

Stop-loss = Entry Price − Risk per Share

Target = Entry Price + (Entry − Stop-loss) × Risk-Reward

Projected capital if stop-loss or target hits

The results are displayed instantly to the user.
