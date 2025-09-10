import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ScreenShotService {
  async take(data: { url: string }) {
    if (!data?.url) {
      throw new BadRequestException('URL is required');
    }

    try {
      // Validate URL
      let url: URL;
      try {
        url = new URL(data.url);
      } catch {
        throw new BadRequestException('Invalid URL format');
      }

      // Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Set a timeout
      await page.setDefaultNavigationTimeout(30000);

      // Navigate to page
      await page.goto(url.href, {
        waitUntil: 'networkidle2',
      });

      // Generate file path
      const fileName = `screenshot-${Date.now()}.png`;
      const filePath = path.join(process.cwd(), 'tmp', fileName);

      // Ensure tmp directory exists
      if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
        fs.mkdirSync(path.join(process.cwd(), 'tmp'));
      }

      // Take full page screenshot
      await page.screenshot({
        path: fileName as `${string}.png`,
        fullPage: true,
      });

      await browser.close();

      return {
        fileName,
        downloadUrl: `/screen-shot/download/${fileName}`,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to capture screenshot: ${err.message}`,
      );
    }
  }
}
