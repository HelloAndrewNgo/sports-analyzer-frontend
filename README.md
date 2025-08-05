# Sport Analyzer Frontend

A modern React application for uploading and analyzing sports videos with AI-powered feedback overlays.

## Features

- **Drag & Drop Video Upload**: Easy video file upload with drag-and-drop interface
- **Custom Analysis Prompts**: Configure AI analysis prompts for different sports and feedback styles
- **Adjustable FPS**: Control frame rate for analysis (faster processing vs. detailed analysis)
- **Real-time Processing**: Live progress tracking during video analysis
- **Side-by-side Comparison**: View original and processed videos simultaneously
- **Detailed Analytics**: Frame-by-frame analysis with statistics and feedback
- **Modern UI**: Beautiful dark theme with smooth animations
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- Backend server running (see backend README)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd sport-analyzer-frontend
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`.

## Usage

### 1. Upload Video
- Drag and drop a video file onto the upload area
- Supported formats: MP4, AVI, MOV, MKV, WebM
- Maximum file size: 100MB

### 2. Configure Analysis
- **Prompt**: Enter your analysis prompt or use the example
- **FPS**: Set frames per second for analysis (1 FPS recommended for faster processing)

### 3. Process Video
- Click "Analyze Video" to start processing
- Monitor progress in real-time
- Processing time depends on video length and FPS setting

### 4. View Results
- **Original Video**: Side-by-side comparison with processed video
- **Processed Video**: Video with AI feedback overlay
- **Analysis Results**: Detailed statistics and frame-by-frame feedback

## Example Prompts

### Basketball Analysis
```
This is me playing basketball slowed down.
Tell me how many shots I made tell me how many lay ups I made tell me how many three-pointers I made
tell me how many shots I missed and tell me from where I made shots as well and tell me the steps on
which made the shot and missed the shot
On every shot. Give me feedback like you're Michael Jordan.
go at 1 fps
```

### General Sports Analysis
```
Analyze this sports video and provide detailed feedback on:
- Performance metrics
- Technique evaluation
- Areas for improvement
- Specific coaching advice
Format feedback for video overlay display.
```

## Project Structure

```
sport-analyzer-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── VideoUpload.js      # Upload interface
│   │   ├── VideoPlayer.js      # Video player component
│   │   └── AnalysisResults.js  # Results display
│   ├── App.js                  # Main application
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## Technologies Used

- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Dropzone**: File upload handling
- **React Player**: Video playback
- **Lucide React**: Icon library
- **Axios**: HTTP client for API calls

## Configuration

The frontend is configured to proxy API requests to the backend at `http://localhost:3001`. This is set in `package.json`:

```json
{
  "proxy": "http://localhost:3001"
}
```

## Development

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_MAX_FILE_SIZE=100000000
```

## Features in Detail

### Video Upload
- Drag and drop interface
- File type validation
- Progress tracking
- Error handling

### Video Player
- Custom controls
- Volume control
- Fullscreen support
- Progress seeking

### Analysis Results
- Statistics dashboard
- Frame-by-frame breakdown
- Expandable analysis details
- Performance metrics

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

1. **FPS Setting**: Lower FPS (0.5-1) for faster processing
2. **Video Size**: Compress videos before upload for faster processing
3. **Browser**: Use Chrome for best performance
4. **Network**: Ensure stable internet connection for large file uploads

## Troubleshooting

### Common Issues

1. **Upload Fails**
   - Check file size (max 100MB)
   - Verify file format
   - Ensure backend is running

2. **Processing Stuck**
   - Check backend logs
   - Verify Claude API key
   - Try lower FPS setting

3. **Video Won't Play**
   - Check browser compatibility
   - Verify video format
   - Clear browser cache

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT # sports-analyzer-frontend
