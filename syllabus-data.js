const SYLLABUS_COURSES = [
  {
    code: 'SR 601',
    name: 'Mathematics for Robotics',
    credits: 3,
    sequence: [
      'Vectors & matrices',
      'Sets, graphs & probability',
      'Multivariable calculus & ODEs',
      'Invertibility & Jacobian',
      'Optimization & numerical linear algebra'
    ],
    units: [
      {
        title: 'Unit I — Vectors, matrices and calculus',
        topics: [
          ['Vectors', ''],
          ['Dot and cross products', ''],
          ['Vector spaces', ''],
          ['Basis and dimension', ''],
          ['Matrix operations: addition, multiplication, transpose, inverse', ''],
          ['Eigenvalues and eigenvectors', ''],
          ['Diagonalization', ''],
          ['Gradient, divergence, curl', ''],
          ['Hessian', '']
        ]
      },
      {
        title: 'Unit II — Sets, graphs, probability and stochastic processes',
        topics: [
          ['Set theory', ''],
          ['Graph theory', ''],
          ['Probability theory', ''],
          ['Bayes theorem', ''],
          ['Stochastic process', ''],
          ['Markov theorem', '']
        ]
      },
      {
        title: 'Unit III — Multivariable calculus, ODEs and numerical integration',
        topics: [
          ['Multivariable functions', ''],
          ['Partial derivatives', ''],
          ['Total derivative', ''],
          ['Chain rule', ''],
          ['Ordinary differential equations: first- and second-order systems', ''],
          ['Numerical integration: Euler method', ''],
          ['Numerical integration: Runge-Kutta methods', ''],
          ['Linear and nonlinear mapping', '']
        ]
      },
      {
        title: 'Unit IV — Invertibility, Jacobian and integration',
        topics: [
          ['Inverse function theorem', ''],
          ['Conditions for invertibility', ''],
          ['Singularities and rank deficiency of Jacobian', ''],
          ['Integration', '']
        ]
      },
      {
        title: 'Unit V — Optimization and numerical linear algebra',
        topics: [
          ['Objective functions and constraints', ''],
          ['Unconstrained optimization', ''],
          ['Constrained optimization (Lagrange multipliers)', ''],
          ['Least-squares solutions, pseudoinverse', ''],
          ['Basics of numerical linear algebra: LU decomposition', ''],
          ['Basics of numerical linear algebra: QR decomposition', '']
        ]
      }
    ]
  },
  {
    code: 'SR 602',
    name: 'Robotics-I',
    credits: 3,
    sequence: [
      'Robot fundamentals',
      'DOF & specification',
      'Kinematics & transformations',
      'Inverse kinematics & Jacobian',
      'Trajectory planning'
    ],
    units: [
      {
        title: 'Unit I — Introduction to robotics',
        topics: [
          ['Introduction to Robotics', ''],
          ['Laws of Robotics', ''],
          ['Types and components of robot anatomy', ''],
          ['Robot terminology: links, joints', ''],
          ['Robot classification based on motion', ''],
          ['Robot classification based on configuration', '']
        ]
      },
      {
        title: 'Unit II — Degrees of freedom and robot specification',
        topics: [
          ['Degrees of freedom (DOF)', ''],
          ['Specification of a robot', ''],
          ['Work volume and workspace', ''],
          ['Work object', ''],
          ['Robot geometrical configurations (PPP, RPP, RRP, RRR, etc.)', ''],
          ['Selection of robots', ''],
          ['Control resolution and spatial resolution', '']
        ]
      },
      {
        title: 'Unit III — Kinematic systems and transformations',
        topics: [
          ['Robot work cell', ''],
          ['Kinematic systems', ''],
          ['Spatial descriptions: position, orientation and frames', ''],
          ['Coordinate frames', ''],
          ['Mapping between frames (D-H method and DH-free notations)', ''],
          ['Translations, rotations and transformation matrices', ''],
          ['Homogeneous transformation matrix', ''],
          ['Serial and parallel manipulators', '']
        ]
      },
      {
        title: 'Unit IV — Inverse kinematics, Jacobian and dynamics',
        topics: [
          ['Inverse kinematics: geometric method', ''],
          ['Inverse kinematics: analytical method', ''],
          ['Velocity and velocity propagation', ''],
          ['Jacobian', ''],
          ['Acceleration', ''],
          ['Jacobian–force relationship', ''],
          ['Robot dynamics', ''],
          ['Inertia properties', '']
        ]
      },
      {
        title: 'Unit V — Trajectory planning',
        topics: [
          ['Trajectory planning definition', ''],
          ['General consideration in path description and motion generation', ''],
          ['Point-to-point motion: straight line path', ''],
          ['Trapezoidal motion profile', ''],
          ['S-curve motion profile', ''],
          ['Polynomial via-point trajectories', '']
        ]
      }
    ]
  },
  {
    code: 'SR 603',
    name: 'Robot Vision and Perception',
    credits: 3,
    sequence: [
      'Vision system fundamentals',
      'Image acquisition & processing',
      'Image enhancement & analysis',
      '3D vision & calibration',
      'Motion estimation & tracking'
    ],
    units: [
      {
        title: 'Unit I — Vision system fundamentals',
        topics: [
          ['Architecture of robotic vision system', ''],
          ['Vision system components', ''],
          ['Basic optics', ''],
          ['Basic radiometry', ''],
          ['Image formats', ''],
          ['Image noise', ''],
          ['Image representation', ''],
          ['Colour space', ''],
          ['Conversion of colour spaces', '']
        ]
      },
      {
        title: 'Unit II — Acquisition, processing and scanners',
        topics: [
          ['Image acquisition', ''],
          ['Image representation and processing', ''],
          ['Data acquisition and digitization', ''],
          ['Conversion, transmission and processing', ''],
          ['2D laser scanners', ''],
          ['3D laser scanners', ''],
          ['Robot vision and 3D cameras', ''],
          ['Filters for removal of noise', '']
        ]
      },
      {
        title: 'Unit III — Image processing and feature extraction',
        topics: [
          ['Image pre-processing', ''],
          ['Image enhancement', ''],
          ['Operations on images', ''],
          ['Noise removal', ''],
          ['Segmentation', ''],
          ['Thresholding', ''],
          ['Edge detection algorithms', ''],
          ['Morphological operations', ''],
          ['Image analysis: coding and representation of regions', ''],
          ['Dimensional analysis', ''],
          ['Feature extraction', ''],
          ['Fourier transformations', ''],
          ['Spatial domain techniques', ''],
          ['Lossless and lossy image compression', ''],
          ['Image scaling', ''],
          ['Standard video formats', '']
        ]
      },
      {
        title: 'Unit IV — 3D vision, geometry and calibration',
        topics: [
          ['Perspective projection geometry', ''],
          ['Pinhole camera model', ''],
          ['Lens distortion', ''],
          ['Affine and metric geometry', ''],
          ['2D and 3D geometrical transformations', ''],
          ['Intrinsic camera parameters', ''],
          ['Extrinsic camera parameters', ''],
          ['Calibration methods', ''],
          ['Stereovision', ''],
          ['Epipolar geometry', ''],
          ['Triangulation', ''],
          ['Rotational matrix', ''],
          ['Fundamental matrix', ''],
          ['Stereo correspondence algorithms: feature based', ''],
          ['Stereo correspondence algorithms: correlation based', '']
        ]
      },
      {
        title: 'Unit V — Motion estimation and tracking',
        topics: [
          ['Optical flow estimation', ''],
          ['Sensor fusion concept', ''],
          ['Kalman filter', ''],
          ['SLAM fundamentals', ''],
          ['Object tracking with Kalman filtering', ''],
          ['Feature extraction & object recognition', ''],
          ['Case studies / applications', '']
        ]
      }
    ]
  },
  {
    code: 'SR 604',
    name: 'Control Engineering',
    credits: 3,
    sequence: [
      'Automatic control fundamentals',
      'Modelling & transfer functions',
      'Time response & stability',
      'Frequency control & PID',
      'State-space & controllability'
    ],
    units: [
      {
        title: 'Unit I — Automatic control system fundamentals',
        topics: [
          ['Definition of automatic control', ''],
          ['Types and order of the system', ''],
          ['Performance specifications', ''],
          ['Design process', ''],
          ['Block diagrams', ''],
          ['Laplace transform and transient analysis', ''],
          ['Closed and open loop systems', ''],
          ['Feedback and feedforward control systems', '']
        ]
      },
      {
        title: 'Unit II — Modelling and transfer functions',
        topics: [
          ['Modelling of mechanical systems', ''],
          ['Modelling of electrical systems', ''],
          ['Modelling of hydraulic systems', ''],
          ['Block diagram representations', ''],
          ['Transfer functions', ''],
          ['Block diagram reduction techniques', ''],
          ['Signal flow graphs', '']
        ]
      },
      {
        title: 'Unit III — Time response and stability',
        topics: [
          ['Time response analysis', ''],
          ['Standard test signals', ''],
          ['Static and dynamic characteristics of control systems', ''],
          ['Transient response for first-order systems', ''],
          ['Transient response for second-order systems', ''],
          ['Time domain specifications', ''],
          ['Stability analysis', ''],
          ['Routh-Hurwitz criterion', '']
        ]
      },
      {
        title: 'Unit IV — Frequency response, controllers and state-space',
        topics: [
          ['Frequency domain controller analysis and design', ''],
          ['Compensators', ''],
          ['P controller', ''],
          ['PI controller', ''],
          ['PD controller', ''],
          ['PID controller', ''],
          ['State space analysis', ''],
          ['State model for LTI system', ''],
          ['Diagonalization', ''],
          ['State equation', ''],
          ['Transition matrix', '']
        ]
      },
      {
        title: 'Unit V — Controllability, observability and feedback',
        topics: [
          ['Controllability', ''],
          ['Observability', ''],
          ['Pole placement with state feedback', ''],
          ['Pole placement with output feedback', ''],
          ['Case studies', '']
        ]
      }
    ]
  },
  {
    code: 'SR 605',
    name: 'Essential Concepts for Robotics',
    credits: 3,
    sequence: [
      'Physical principles',
      'Simple machines',
      'Electronics & drives',
      'Sensors & measurement',
      'Actuators & motors'
    ],
    units: [
      {
        title: 'Unit I — Physical principles',
        topics: [
          ['Force and torque', ''],
          ['Motion', ''],
          ["Newton's laws of motion", ''],
          ['Momentum and conservation of momentum', ''],
          ['Work, power and energy', '']
        ]
      },
      {
        title: 'Unit II — Simple machines',
        topics: [
          ['Inclined plane', ''],
          ['Screw jack', ''],
          ['Gears', ''],
          ['Belts and pulleys', ''],
          ['Lever', ''],
          ['Wedge', ''],
          ['Efficiency of machines', '']
        ]
      },
      {
        title: 'Unit III — Electronics, digital logic and drives',
        topics: [
          ['Overview of semiconductor devices: BJT, MOSFET, SCR, TRIAC, photodiodes', ''],
          ['Power supplies', ''],
          ['Signal amplification', ''],
          ['Active filters', ''],
          ['Op-amp applications', ''],
          ['Number systems', ''],
          ['Logic gates', ''],
          ['Boolean algebra', ''],
          ['Flip-flops', ''],
          ['Multiplexers', ''],
          ['ADC/DAC', ''],
          ['Digital multimeters', ''],
          ['Frequency counters', ''],
          ['Drive control: electric braking, duty cycles, speed/position control', ''],
          ['Electric drives: components, multi-quadrant operation, torque equations', '']
        ]
      },
      {
        title: 'Unit IV — Sensors and measurement',
        topics: [
          ['Introduction to sensors', ''],
          ['Principles of transduction and common conversion methods', ''],
          ['Sensor characteristics', ''],
          ['Calibration', ''],
          ['Signal conditioning', ''],
          ['Encoders', ''],
          ['LVDT', ''],
          ['Potentiometers', ''],
          ['Hall-effect sensors', ''],
          ['Proximity sensors', ''],
          ['Ultrasonic sensors', ''],
          ['Optical sensors', ''],
          ['GPS', ''],
          ['IMU', ''],
          ['LIDAR', ''],
          ['RADAR', ''],
          ['Smart sensors and shape memory materials', '']
        ]
      },
      {
        title: 'Unit V — Actuators, motors and drives',
        topics: [
          ['Introduction to actuators', ''],
          ['Electric actuators: construction and working', ''],
          ['DC motors', ''],
          ['Servo motors', ''],
          ['Stepper motors', ''],
          ['BLDC motors', ''],
          ['Switched reluctance motors', ''],
          ['AC induction motors', ''],
          ['AC synchronous motors', ''],
          ['Torque-speed characteristics of AC machines', ''],
          ['Electric drives: components and multi-quadrant operation', '']
        ]
      }
    ]
  },
  {
    code: 'SR 614',
    name: 'Swarm Robotics',
    credits: 3,
    sequence: [
      'Swarm foundations',
      'ACO & PSO',
      'Practical challenges & hardware',
      'Swarm behaviours',
      'Modelling & multi-agent learning'
    ],
    units: [
      {
        title: 'Unit I — Swarm intelligence and swarm robotics',
        topics: [
          ['Introduction to Swarm Intelligence', ''],
          ['Introduction to Swarm Robotics', ''],
          ['Differences between Multi Robot Systems, Multi Agent Systems and Swarm Robotics', ''],
          ['Applications of Swarm Robotics', ''],
          ['Features of Swarm robots', ''],
          ['Scalability and performance of Swarm: Amdahl’s law', ''],
          ['Scalability and performance: Gustafson’s law', ''],
          ['Scalability and performance: Universal Scalability law', '']
        ]
      },
      {
        title: 'Unit II — Metaheuristics and optimization',
        topics: [
          ['Swarm Intelligence and other metaheuristic algorithms', ''],
          ['Ant Colony Optimization (ACO)', ''],
          ['Particle Swarm Optimization (PSO)', ''],
          ['Apply SI to solve NP-hard problems like TSP', '']
        ]
      },
      {
        title: 'Unit III — Practical swarm systems',
        topics: [
          ['Challenges/issues in applying Swarm Robotics for practical problems', ''],
          ['Robotic hardware platforms', ''],
          ['Sensors', ''],
          ['Odometry', ''],
          ['SLAM', ''],
          ['ROS introduction', '']
        ]
      },
      {
        title: 'Unit IV — Swarm behaviours and collective control',
        topics: [
          ['Aggregation', ''],
          ['Dispersion', ''],
          ['Pattern formation', ''],
          ['Flocking behavior', ''],
          ['Synchronization', ''],
          ['Consensus', ''],
          ['Area coverage', ''],
          ['Olfaction', ''],
          ['Chaining', ''],
          ['Clustering', ''],
          ['Leader following', ''],
          ['Stability and convergence of swarm behaviours (e.g. consensus control)', '']
        ]
      },
      {
        title: 'Unit V — Modelling, simulation and multi-agent learning',
        topics: [
          ['Rate equation', ''],
          ['Langevin equation', ''],
          ['Fokker-Planck equations', ''],
          ['Finite State Machines (FSM)', ''],
          ['Graph theory', ''],
          ['Kuramoto model', ''],
          ['Potential field theory', ''],
          ["Reynolds' flocking model", ''],
          ['Task allocation', ''],
          ['Case study for energy optimization (dynamic task allocation)', ''],
          ['Swarm robot architectures', ''],
          ['Human swarm interaction', ''],
          ['Swarm counter measures', ''],
          ['Collective decision-making models (Voter, Majority, Urn, Kuramoto, consensus)', ''],
          ['Reinforcement learning for multi-agent applications', ''],
          ['Deep reinforcement learning for multi-agent applications', '']
        ]
      }
    ]
  },
  {
    code: 'PGC-601',
    name: 'Research Methodology and IPR',
    credits: 2,
    sequence: [
      'Research problem & investigation',
      'Literature & ethics',
      'Technical writing & proposal',
      'IPR & patenting process',
      'Patent rights',
      'New developments in IPR'
    ],
    units: [
      {
        title: 'Unit I — Research problem and investigation',
        topics: [
          ['Meaning of research problem', ''],
          ['Sources of research problem', ''],
          ['Criteria and characteristics of a good research problem', ''],
          ['Errors in selecting a research problem', ''],
          ['Scope and objectives of research problem', ''],
          ['Approaches of investigation of solutions for research problem', ''],
          ['Data collection, analysis, interpretation', ''],
          ['Necessary instrumentations', '']
        ]
      },
      {
        title: 'Unit II — Literature studies and research ethics',
        topics: [
          ['Effective literature studies approaches', ''],
          ['Analysis', ''],
          ['Plagiarism', ''],
          ['Research ethics', '']
        ]
      },
      {
        title: 'Unit III — Technical writing and research proposal',
        topics: [
          ['Effective technical writing', ''],
          ['How to write a report', ''],
          ['Paper writing', ''],
          ['Developing a research proposal', ''],
          ['Format of research proposal', ''],
          ['Presentation and assessment by a review committee', '']
        ]
      },
      {
        title: 'Unit IV — Intellectual property and patenting process',
        topics: [
          ['Nature of Intellectual Property: Patents, Designs, Trade and Copyright', ''],
          ['Process of patenting and development: technological research, innovation, patenting, development', ''],
          ['International scenario: International cooperation on Intellectual Property', ''],
          ['Procedure for grants of patents', ''],
          ['Patenting under PCT', '']
        ]
      },
      {
        title: 'Unit V — Patent rights and technology transfer',
        topics: [
          ['Patent Rights: Scope of Patent Rights', ''],
          ['Licensing and transfer of technology', ''],
          ['Patent information and databases', ''],
          ['Geographical Indications', '']
        ]
      },
      {
        title: 'Unit VI — New developments in IPR',
        topics: [
          ['Administration of Patent System', ''],
          ['New developments in IPR', ''],
          ['IPR of Biological Systems', ''],
          ['IPR of Computer Software', ''],
          ['Traditional knowledge case studies', ''],
          ['IPR and IITs', '']
        ]
      }
    ]
  }
];