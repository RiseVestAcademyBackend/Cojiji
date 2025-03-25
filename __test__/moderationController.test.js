// Mock models
jest.mock('../models/moderation', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    belongsTo: jest.fn(),
    hasMany: jest.fn()
  }));
  
  jest.mock('../models/buyer', () => ({
    findByPk: jest.fn(),
    hasMany: jest.fn()
  }));
  
  jest.mock('../models/comment', () => ({
    findByPk: jest.fn(),
    hasMany: jest.fn()
  }));
  
  const moderationController = require('../controllers/moderationController');
  const Moderation = require('../models/moderation');
  const User = require('../models/buyer');
  const Comment = require('../models/comment');
  
  describe('Moderation Controller Tests', () => {
    let req, res;
    
    beforeEach(() => {

      jest.clearAllMocks();
      
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
    
    describe('flagComment', () => {
      beforeEach(() => {
        req = {
          body: {
            userId: '123e4567-e89b-12d3-a456-426614174000',
            commentId: '123e4567-e89b-12d3-a456-426614174001',
            reason: 'Inappropriate content'
          }
        };
      });
      
      test('should flag a comment successfully', async () => {
        
        Comment.findByPk.mockResolvedValue({
          id: req.body.commentId,
          content: 'Test comment'
        });
        
        
        Moderation.create.mockResolvedValue({
          id: '123e4567-e89b-12d3-a456-426614174002',
          userId: req.body.userId,
          targetId: req.body.commentId,
          type: 'comment',
          reason: req.body.reason
        });
        
        await moderationController.flagComment(req, res);
        
        expect(Comment.findByPk).toHaveBeenCalledWith(req.body.commentId);
        expect(Moderation.create).toHaveBeenCalledWith({
          userId: req.body.userId,
          targetId: req.body.commentId,
          type: 'comment',
          reason: req.body.reason
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment flagged successfully' });
      });
      
      test('should return 404 when comment does not exist', async () => {
        // Mock comment not found
        Comment.findByPk.mockResolvedValue(null);
        
        await moderationController.flagComment(req, res);
        
        expect(Comment.findByPk).toHaveBeenCalledWith(req.body.commentId);
        expect(Moderation.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment not found' });
      });
      
      test('should return 500 on server error', async () => {
        // Mock server error
        Comment.findByPk.mockRejectedValue(new Error('Database error'));
        console.error = jest.fn(); // Mock console.error to prevent actual logging during tests
        
        await moderationController.flagComment(req, res);
        
        expect(Comment.findByPk).toHaveBeenCalledWith(req.body.commentId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
      });
    });
    
    describe('reportScam', () => {
      beforeEach(() => {
        req = {
          body: {
            userId: '123e4567-e89b-12d3-a456-426614174000',
            reportedUserId: '123e4567-e89b-12d3-a456-426614174003',
            reason: 'Fake product listing'
          }
        };
      });
      
      test('should report a user as scam successfully', async () => {
        // Mock successful user find
        User.findByPk.mockResolvedValue({
          id: req.body.reportedUserId,
          username: 'scammer123'
        });
        
        // Mock successful moderation creation
        Moderation.create.mockResolvedValue({
          id: '123e4567-e89b-12d3-a456-426614174004',
          userId: req.body.userId,
          targetId: req.body.reportedUserId,
          type: 'scam',
          reason: req.body.reason
        });
        
        await moderationController.reportScam(req, res);
        
        expect(User.findByPk).toHaveBeenCalledWith(req.body.reportedUserId);
        expect(Moderation.create).toHaveBeenCalledWith({
          userId: req.body.userId,
          targetId: req.body.reportedUserId,
          type: 'scam',
          reason: req.body.reason
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User reported as scam successfully' });
      });
      
      test('should return 404 when reported user does not exist', async () => {
        // Mock user not found
        User.findByPk.mockResolvedValue(null);
        
        await moderationController.reportScam(req, res);
        
        expect(User.findByPk).toHaveBeenCalledWith(req.body.reportedUserId);
        expect(Moderation.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
      });
      
      test('should return 500 on server error', async () => {
        // Mock server error
        User.findByPk.mockRejectedValue(new Error('Database error'));
        console.error = jest.fn(); // Mock console.error to prevent actual logging
        
        await moderationController.reportScam(req, res);
        
        expect(User.findByPk).toHaveBeenCalledWith(req.body.reportedUserId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
      });
    });
    
    describe('getFlaggedComments', () => {
      test('should return all flagged comments', async () => {
        const mockFlaggedComments = [
          {
            id: '123e4567-e89b-12d3-a456-426614174005',
            userId: '123e4567-e89b-12d3-a456-426614174000',
            targetId: '123e4567-e89b-12d3-a456-426614174001',
            type: 'comment',
            reason: 'Inappropriate content',
            User: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              username: 'reporter1'
            },
            FlaggedComment: {
              id: '123e4567-e89b-12d3-a456-426614174001',
              content: 'This comment was flagged'
            }
          }
        ];
        
        // Mock successful query
        Moderation.findAll.mockResolvedValue(mockFlaggedComments);
        
        await moderationController.getFlaggedComments(req, res);
        
        expect(Moderation.findAll).toHaveBeenCalledWith({
          where: { type: 'comment' },
          include: [
            {
              model: User,
              as: 'User',
              attributes: ['id', 'username']
            },
            {
              model: Comment,
              as: 'FlaggedComment',
              attributes: ['id', 'content']
            }
          ]
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockFlaggedComments);
      });
      
      test('should return 500 on server error', async () => {
        // Mock server error
        Moderation.findAll.mockRejectedValue(new Error('Database error'));
        console.error = jest.fn(); // Mock console.error
        
        await moderationController.getFlaggedComments(req, res);
        
        expect(Moderation.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
      });
    });
    
    describe('getReportedScams', () => {
      test('should return all reported scams', async () => {
        const mockReportedScams = [
          {
            id: '123e4567-e89b-12d3-a456-426614174006',
            userId: '123e4567-e89b-12d3-a456-426614174000',
            targetId: '123e4567-e89b-12d3-a456-426614174003',
            type: 'scam',
            reason: 'Fake product listing',
            User: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              username: 'reporter1'
            },
            ReportedUser: {
              id: '123e4567-e89b-12d3-a456-426614174003',
              username: 'scammer123'
            }
          }
        ];
        
        // Mock successful query
        Moderation.findAll.mockResolvedValue(mockReportedScams);
        
        await moderationController.getReportedScams(req, res);
        
        expect(Moderation.findAll).toHaveBeenCalledWith({
          where: { type: 'scam' },
          include: [
            {
              model: User,
              as: 'User',
              attributes: ['id', 'username']
            },
            {
              model: User,
              as: 'ReportedUser',
              attributes: ['id', 'username']
            }
          ]
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockReportedScams);
      });
      
      test('should return 500 on server error', async () => {
        // Mock server error
        Moderation.findAll.mockRejectedValue(new Error('Database error'));
        console.error = jest.fn(); // Mock console.error
        
        await moderationController.getReportedScams(req, res);
        
        expect(Moderation.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
      });
    });
  });